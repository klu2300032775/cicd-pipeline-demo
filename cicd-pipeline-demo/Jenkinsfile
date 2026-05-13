pipeline {
    agent any

    environment {
        IMAGE_NAME = 'cicd-pipeline-demo'
        IMAGE_TAG  = "${BUILD_NUMBER}"
        DOCKERHUB_USER = credentials('dockerhub-username')
        DOCKERHUB_PASS = credentials('dockerhub-password')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo "Code checked out from branch: ${env.BRANCH_NAME}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci --only=production'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} .
                    docker tag ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ${DOCKERHUB_USER}/${IMAGE_NAME}:latest
                """
            }
        }

        stage('Trivy Security Scan') {
            steps {
                sh """
                    trivy image \
                        --exit-code 1 \
                        --severity HIGH,CRITICAL \
                        --no-progress \
                        ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh """
                    echo ${DOCKERHUB_PASS} | docker login -u ${DOCKERHUB_USER} --password-stdin
                    docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}
                    docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:latest
                """
            }
        }

        stage('Deploy to Render') {
            steps {
                sh """
                    curl -X POST \
                        -H 'Authorization: Bearer ${RENDER_API_KEY}' \
                        -H 'Content-Type: application/json' \
                        -d '{"serviceId": "${RENDER_SERVICE_ID}"}' \
                        https://api.render.com/v1/services/${RENDER_SERVICE_ID}/deploys
                """
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f'
        }
        success {
            echo "Pipeline SUCCESS — Build #${BUILD_NUMBER} deployed"
        }
        failure {
            echo "Pipeline FAILED — Check Trivy scan or build logs"
        }
    }
}

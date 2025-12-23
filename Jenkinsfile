pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "lakshmanan1996/amazon-clone-react:latest"
        K8S_NAMESPACE = "amazon-clone"
        KUBECONFIG = "/home/azureuser/.kube/config" // Path to kubeconfig for VM2
    }

    stages {
        stage('Checkout Source') {
            steps {
                git branch: 'master', url: 'https://github.com/yourusername/Amazone_Clone_ReactJs.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run test -- --watchAll=false'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('SonarQube Scan') {
            environment {
                SONAR_HOST_URL = 'http://localhost:9000'
                SONAR_LOGIN = credentials('sonar-token')
            }
            steps {
                sh "sonar-scanner -Dsonar.projectKey=amazon-clone -Dsonar.sources=src -Dsonar.host.url=$SONAR_HOST_URL -Dsonar.login=$SONAR_LOGIN"
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh "docker build -t $DOCKER_IMAGE ."
                sh "docker login -u your-dockerhub-username -p your-dockerhub-password"
                sh "docker push $DOCKER_IMAGE"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh "kubectl apply -f k8s/deployment.yaml -n $K8S_NAMESPACE"
                sh "kubectl apply -f k8s/service.yaml -n $K8S_NAMESPACE"
                sh "kubectl rollout status deployment amazon-clone-deployment -n $K8S_NAMESPACE"
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed!'
        }
    }
}

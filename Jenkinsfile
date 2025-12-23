pipeline {
    agent any

    tools {
        nodejs 'node16'
    }

    environment {
        DOCKER_IMAGE = "lakshmanan1996/amazon-clone-react:latest"
        K8S_NAMESPACE = "amazon-clone"
        KUBECONFIG = "/home/azureuser/.kube/config"
    }

    stages {

        stage('Checkout Source') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Lakshmanan1996/Amazone_Clone_ReactJs.git',
                    credentialsId: 'github-creds'
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

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                      docker build -t $DOCKER_IMAGE .
                      echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                      docker push $DOCKER_IMAGE
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                  kubectl get namespace $K8S_NAMESPACE || kubectl create namespace $K8S_NAMESPACE
                  kubectl apply -f k8s/deployment.yaml -n $K8S_NAMESPACE
                  kubectl apply -f k8s/service.yaml -n $K8S_NAMESPACE
                  kubectl rollout status deployment amazon-clone-deployment -n $K8S_NAMESPACE
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Pipeline Failed!'
        }
    }
}

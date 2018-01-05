#!/usr/bin/env groovy
PRID = ''

def isPullRequest() {
    try {
        println("Building pull request: ${pullRequestId}")
        PRID = pullRequestId
        return true
    } catch (Exception e) {
        return false
    }
}

def doCheckout() {
    stage('Checkout') {
        deleteDir()
        checkout scm
    }
}

def doInstall() {
    stage('Install') {
        echo 'Installing dependencies'
        sh 'npm install'
    }
}

def doTest() {
    stage('Test') {
        echo 'Run Static Code Analysis'
        env.NODE_ENV = "test"
        env.BABEL_DISABLE_CACHE = 1
        print "Environment variable is: ${env.NODE_ENV}"
        sh 'npm run lint'
        sh 'npm run sanitycheck'
    }
}

def doBuild() {
    stage('Build') {
        env.NODE_ENV = "production"
        print "Environment variable is: ${env.NODE_ENV}"
        echo 'Building'
        sh 'npm run build'
        echo 'Bumping npm version'
        sh 'npm --no-git-tag-version version patch'
    }
}

def doPublish() {
    stage('Publish') {
        echo 'Git login'
        sh "git config user.email 'devops-service-dl@jcp.com'"
        sh "git config user.name 'Jenkins JCPenney'"

        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'batchuser', usernameVariable: 'BATCH_USER_NAME', passwordVariable: 'BATCH_USER_PASSWORD']]) {
            sh """
                echo 'BATCH_USER_NAME=${env.BATCH_USER_NAME}' >> swarm/.env
                echo 'BATCH_USER_PASSWORD=${env.BATCH_USER_PASSWORD}' >> swarm/.env
            """
        }
        echo 'Adding version commit to git'
        sh "git add package.json; git commit -m '[UPGRADE] Version upgrade commit'"
        echo 'Pushing version commit to git'
        sh 'git push'
        echo 'Publish to NPM Repo'
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'jenkins_registry_cred', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME']]) {
            sh "echo 'email=DP-JCP-RWDDevs-All-dl@jcp.com\nalways-auth=true\n_auth=eW9kYTp5b2Rh' > .npmrc"
            // or using AUTH_TOKEN=eW9kYTp5b2Rh
        }

        sh 'npm publish --registry https://nexus.infra.dp-dev.jcpcloud2.net/content/repositories/npm-releases/'
    }
}

def doReport() {
    stage('Report') {
        // step([$class: 'JUnitResultArchiver', testResults: '**/build/test-results/*.xml', allowEmptyResults: true])
        // step([$class: 'CheckStylePublisher', pattern: '**/build/reports/checkstyle/*.xml', canRunOnFailed: true])
        // archive 'build/license*.zip, build/version.properties'
    }
}

def notifyStash() {
    step([
            $class                       : 'StashNotifier',
            commitSha1                   : '',
            credentialsId                : 'service_ldap_cred',
            disableInprogressNotification: false,
            ignoreUnverifiedSSLPeer      : true,
            includeBuildNumberInKey      : false,
            prependParentProjectKey      : false,
            projectKey                   : '',
            stashServerBaseUrl           : 'https://stash.jcpenney.com'
    ])
}

def doBuildPipeline(publish) {
    notifyStash()
    def aws = docker.image('registry.dp-dev.jcpcloud2.net/jcp-nodejs:1.3')
    def exec_num = "${env.EXECUTOR_NUMBER}"
    sh "mkdir -p /opt/jenkins/${exec_num}/.npm"
    aws.pull()
    aws.inside("-v /opt/jenkins/${exec_num}/.npm:/.npm/") {
        doInstall()
        try {
            doTest()
            if(publish) {
                doBuild()
            }
            currentBuild.result = 'SUCCESS'
        } catch (ignored) {
            currentBuild.result = 'FAILED'
            throw ignored
        } finally {
            doReport()
            notifyStash()
        }
    }
}

if (!isPullRequest()) {
    node('slave') {
        ws("${pwd()}/../${(env.BRANCH_NAME ?: env.JOB_NAME).replace('/', '-')}") {
            catchError {
                doCheckout()
                doBuildPipeline(false) // todo modify to true when we would like to publish
                // doPublish() // todo uncomment when we would like to publish
            }
            step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: 'DP-JCP-RWDDevs-All-dl@jcp.com', sendToIndividuals: true])
        }
    }
} else {
    withEnv(["BRANCH_NAME=${sourceBranch}"]) {
        doBuildPipeline(false)
        // doPublish() // todo uncomment only for test purposes
    }
}

// vim: filetype=groovy
// variables
def remote
def commit
def shortCommit
def version

// configuration
def slavePrefix = "mmg"

// constants
def githubCredentialsId = "github-credentials"
def awsCredentialsId = "aws-credentials"

// pipeline definition
//test(slavePrefix)
release(awsCredentialsId, githubCredentialsId, slavePrefix)
deploy("aslive", slavePrefix, githubCredentialsId, awsCredentialsId)
//deploy("live", slavePrefix, githubCredentialsId, awsCredentialsId)

// reusable code
/*
def test(slavePrefix) {
    stage ("Test") {
        node ("${slavePrefix}dev") {
            checkout scm
            sh "./test.sh"
        }
    }
}
*/

// perform a release - note release() must be called before calling deploy()

def release(awsCredentialsId, githubCredentialsId, slavePrefix) {
    stage ("Release") {
        node ("${slavePrefix}dev") {

            checkout scm

            remote = sh(returnStdout: true, script: "git config remote.origin.url").trim()
            commit = sh(returnStdout: true, script: "git rev-parse HEAD").trim()
            shortCommit = sh(returnStdout: true, script: "git rev-parse --short HEAD").trim()
            version = "${env.BUILD_NUMBER}-${shortCommit}"

            checkoutPlatformConfig()

            withCredentials([[$class: "UsernamePasswordMultiBinding", credentialsId: awsCredentialsId, passwordVariable: "AWS_SECRET_ACCESS_KEY", usernameVariable: "AWS_ACCESS_KEY_ID"]]) {
                wrap([$class: "AnsiColorBuildWrapper"]) {
                    sh "cdflow release --platform-config ./platform-config ${version}"
                }
            }
        }
    }
}


// perform a deploy
def deploy(env, slavePrefix, githubCredentialsId, awsCredentialsId) {

    account = env == "live" || env == "debug" ? "prod" : "dev"

    stage ("Deploy to ${env}") {
        node ("${slavePrefix}${account}") {
            // work around "checkout scm" getting the wrong commit when stages from different commits are interleaved
            git url: remote, credentialsId: githubCredentialsId
            sh "git checkout -q ${commit}"

            withCredentials([[$class: "UsernamePasswordMultiBinding", credentialsId: awsCredentialsId, passwordVariable: "AWS_SECRET_ACCESS_KEY", usernameVariable: "AWS_ACCESS_KEY_ID"]]) {
                wrap([$class: "AnsiColorBuildWrapper"]) {
                    sh "cdflow deploy ${env} ${version}"
                }
            }
        }
    }
}

def checkoutPlatformConfig() {
    checkout([
        $class: 'GitSCM',
        branches: [[name: '*/master']],
        doGenerateSubmoduleConfigurations: false,
        extensions: [[
            $class: 'RelativeTargetDirectory',
            relativeTargetDir: "./platform-config"
        ]],
        submoduleCfg: [],
        userRemoteConfigs: [[
            credentialsId: 'github-credentials',
            url: "https://github.com/mergermarket/mmg-platform-config"
        ]]
    ])
}

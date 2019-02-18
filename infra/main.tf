module "ecs_service" {
  source = "github.com/mergermarket/tf_ecs_service"

  env                            = "${var.env}"
  platform_config                = "${var.platform_config}"
  release                        = "${var.release}"
  common_application_environment = "${var.common_application_environment}"
  application_environment        = "${merge(map(
    "ADDICT_USER"                ,"${local.secret_map["user"]}",
    "ADDICT_PASS"                , "${local.secret_map["pass"]}",
    "ADDDICT_PORT"               , "${local.secret_map["port"]}",
    "ADDICT_URL"                 , "${local.secret_map["url"]}",
    "ADDICT_BASE_DN"                , "${local.secret_map["base-dn"]}"
  ), var.application_environment)}",
  secrets                        = "${var.secrets}"
  ecs_cluster                    = "${var.ecs_cluster}"
  port                           = "${var.port}"
  cpu                            = "${var.cpu}"
  memory                         = "${var.memory}"
  target_group_arn               = "${var.target_group_arn}"
}
# this is what needs to be added
resource "aws_iam_role_policy_attachment" "secrets_attach" {
    role       = "${module.ecs_service.task_role_name}"
    policy_arn = "${module.secrets_policy.policy_arn}"
}
 
module "secrets_policy" {                                                      
    source = "github.com/mergermarket/tf_aws_secrets_access_policy"
    component   = "internal-user-service"
    environment = "${var.env}"
}

data "aws_secretsmanager_secret_version" "secrets" {
  secret_id  = "${var.release["component"]}/aslive/secrets"
  aws_region = "${var.common_application_environment.AWS_REGION}"

}
 
data "external" "secret_json" {
      program = ["echo", "${data.aws_secretsmanager_secret_version.secrets.secret_string}"]
}
 
locals {
    secret_map = "${data.external.secret_json.result}"
}
 

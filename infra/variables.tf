variable "env" {
  description = "Environment name"
}

variable "platform_config" {
  description = "Platform configuration"
  type        = "map"
  default     = {}
}

variable "release" {
  type        = "map"
  description = "Metadata about the release"
}

variable "common_application_environment" {
  description = "Environment parameters passed to the container for all environments"
  type        = "map"
  default     = {}
}

variable "application_environment" {
  description = "Environment specific parameters passed to the container"
  type        = "map"
  default     = {}
}

variable "secrets" {
  type        = "map"
  description = "Secret credentials fetched using credstash"
  default     = {}
}

variable "ecs_cluster" {
  type        = "string"
  description = "The ECS cluster"
  default     = "default"
}

variable "port" {
  type        = "string"
  description = "The port that container will be running on"
}

variable "cpu" {
  type        = "string"
  description = "CPU unit reservation for the container"
}

variable "memory" {
  type        = "string"
  description = "The memory reservation for the container in megabytes"
}

variable "target_group_arn" {
  type        = "string"
  description = "The Amazon Resource Name for the load balancer target group"
}

variable "desired_count" {
  description = "The number of instances of the task definition to place and keep running."
  type        = "string"
  default     = "3"
}

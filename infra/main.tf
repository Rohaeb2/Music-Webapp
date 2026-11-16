

data "aws_ami" "ubuntu"{
    most_recent = true

    filter {
      name = "name"
      values = [ "ubuntu-pro-server/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-pro-server-20251126" ]
    }
    owners = ["099720109477"]
}

resource "aws_instance" "web_server1"{
    ami = data.aws_ami.ubuntu.id
    instance_type = "t3.micro"
    subnet_id = "subnet-0f8f604a4e8344d78"
    tags = {
        Name = "IAC_EC2_1"
    }
    user_data = file ("${path.module}/user_data.sh")
    key_name = "MySQL-Server1"

}
# Java-MultiThreaded-Scheduler
A multithreaded Spring application with a Java backend and Angular frontend. Features include multilingual support, currency display, and time zone conversion. Containerized with Docker for cloud deployment.

The website: 
![image](https://github.com/Jonathankhen/Java-MultiThreaded-Scheduler/assets/121633526/05a4d46f-a456-4bcb-9b99-4d13792f0da9)

![image](https://github.com/Jonathankhen/Java-MultiThreaded-Scheduler/assets/121633526/548b0f4f-0bb8-4076-95dd-c1e5b47d9150)

Multi-Threading time zones:
![image](https://github.com/Jonathankhen/Java-MultiThreaded-Scheduler/assets/121633526/dd58ec01-ec42-4082-b362-5d6cf150fd68)

Multithreading currency conversion: 
![image](https://github.com/Jonathankhen/Java-MultiThreaded-Scheduler/assets/121633526/6acd7696-35fd-48ca-afeb-d5c634725a43)

Project 
![image](https://github.com/Jonathankhen/Java-MultiThreaded-Scheduler/assets/121633526/23d668a9-c613-459c-9bd3-a9616eb997fa)

<body>
    <h3>3. Describe how you would deploy the current multithreaded Spring application to the cloud. Include the name of the cloud service provider you would use.</h3>
    <p>Since I am quite familiar with Microsoft Azure, I would choose it as the cloud service provider for deploying my multithreaded Spring application. Azure provides excellent capabilities for handling Docker containers, which is ideal for this task, as it eliminates the need for server management.</p>
    <p>The first step in the deployment process is to package the application into a Docker container. I would begin by using Maven to build the project, ensuring that the <code>mvn clean package</code> command is executed to compile the application and package it into a <code>.jar</code> file. This <code>.jar</code> file contains the compiled version of the application and all its dependencies.</p>
    <p>Next, I would prepare a Dockerfile that outlines how the Docker container should be built. This Dockerfile would start from a Java runtime environment base image, and it would copy the <code>.jar</code> file from the Maven build into the container. It's critical to set the container to expose port 8080, as this is the standard port for web applications like Spring.</p>
    <p>Once I've confirmed that the Docker container runs correctly on my local machine—ensuring it starts up and serves requests as expected—the next step is to upload the Docker image to Azure Container Registry (ACR). Depending on the setup, I might use an existing registry or create a new one. Azure CLI tools make this process straightforward.</p>
    <p>With the image securely hosted in ACR, deploying the application to Azure Container Instances (ACI) is the final step. This can also be achieved via the Azure portal or through the Azure CLI, specifying the image to be used, allocating necessary resources like CPU and memory, and configuring the network to expose the correct ports.</p>
    <p>Throughout this process, I would regularly commit any configuration changes or updates to my GitLab repository. It's essential to keep the repository updated with the latest Dockerfile, deployment scripts, and application code to track changes and facilitate consistent deployments.</p>
    <p>By leveraging Azure's container services, I can streamline the deployment and management process, allowing me to focus more on developing and optimizing the application rather than managing infrastructure.</p>
</body>
</html>

package com.discord.SERVER;

import com.discord.SERVER.services.GroupService;
import com.discord.SERVER.services.ServerService;
import org.springframework.context.ApplicationContext;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		ApplicationContext context =  SpringApplication.run(ServerApplication.class, args);
		ServerService serverService = context.getBean(ServerService.class);
		//serverService.createServer();
		serverService.deleteServer();

//		GroupService groupService = context.getBean(GroupService.class);
//		groupService.createGroup();
	}

}

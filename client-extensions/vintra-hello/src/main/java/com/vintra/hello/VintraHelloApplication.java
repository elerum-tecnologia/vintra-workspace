package com.vintra.hello;

import com.liferay.client.extension.util.spring.boot.ClientExtensionUtilSpringBootComponentScan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@Import(ClientExtensionUtilSpringBootComponentScan.class)
@SpringBootApplication
public class VintraHelloApplication {

    public static void main(String[] args) {
        SpringApplication.run(VintraHelloApplication.class, args);
    }

}

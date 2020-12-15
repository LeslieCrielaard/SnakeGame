package SnakeRest;

import RestControllers.SnakeScoreController;
import RestDataModels.ScoreTable;
import RestRepositories.ScoreTableRest;
import RestServices.SnakeService;
import ServiceInterfaces.SnakeServiceInterface;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan(basePackageClasses = {SnakeScoreController.class})
@EnableJpaRepositories(basePackageClasses = {ScoreTableRest.class})
@EntityScan(basePackageClasses = {ScoreTable.class})
@SpringBootApplication
public class SnakeRestApplication {

	public static void main(String[] args) {
		SpringApplication.run(SnakeRestApplication.class, args);
	}
	@Bean
	public SnakeServiceInterface SnakeService() {return new SnakeService() {};}

}

package es.iespto.algyjmcg.AntScape.infrastructure.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import es.iespto.algyjmcg.AntScape.infrastructure.security.JwtFilter;

//@Configuration
//@EnableWebSecurity
public class SecurityConfiguration {
	@Autowired
	private JwtFilter jwtAuthFilter;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.cors(cors->cors.disable())
			.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(auth -> auth
						.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
						.requestMatchers("/", "/swagger-ui.html", "/swagger-ui/**", "/v2/**", "configuration/**",
								"/swagger*/**", "/webjars/**", "/api/login", "/api/register", "/api/v1/**", "/v3/**",
								"/websocket*/**", "/chat", "/topic/messages")
						.permitAll()
						.requestMatchers("/api/v3/**").hasRole("ADMIN")
						.requestMatchers("/api/v2/**").hasAnyRole("ADMIN","USER")
						.anyRequest().authenticated())
				.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
		return http.getOrBuild();
	}
}

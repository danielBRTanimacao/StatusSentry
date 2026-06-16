FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /app
COPY . .

RUN mvn clean package

FROM eclipse-temurin:21

WORKDIR /StatusSentry

COPY --from=builder /app/target/Core-0.0.1-SNAPSHOT.jar /core.jar

ENTRYPOINT ["java","-jar","/core.jar"]

EXPOSE 8080
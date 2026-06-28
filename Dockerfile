FROM maven:3.9.16-amazoncorretto-25-alpine AS builder

WORKDIR /app
COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:26.0.1_8-jre-ubi10-minimal

WORKDIR /StatusSentry

COPY --from=builder /app/target/core-0.0.1-SNAPSHOT.jar /core.jar

ENTRYPOINT ["java","-jar","/core.jar"]

EXPOSE 8080
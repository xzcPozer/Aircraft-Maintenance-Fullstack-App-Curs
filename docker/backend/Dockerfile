# Build stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
# copy in /build
COPY pom.xml .

COPY src/main/resources/report/Times-new-roman-font.jar /build/src/main/resources/report/

COPY src/main/resources/report/EngineerPerformedWorks.jrxml /build/src/main/resources/report/

RUN mvn install:install-file -Dfile=src/main/resources/report/Times-new-roman-font.jar -DgroupId=com.sharafutdinov -DartifactId=times-new-roman-fonts -Dversion=1.0.0 -Dpackaging=jar

RUN mvn dependency:go-offline
# copy in /build/src
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM amazoncorretto:17
ARG PROFILE=dev
ARG APP_VERSION=1.0.0

WORKDIR /app
# copy jar file to /app dir
COPY --from=build /build/target/aircraft_maintenance-*.jar /app/

EXPOSE 8088

ENV DB_URL=jdbc:postgresql://ms_pg_slq:5432/aircraft_maintenance_db
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

# start when container running
CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} aircraft_maintenance-${JAR_VERSION}.jar
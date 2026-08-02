# Next.js-project
how to run the frontend = npm install and npm run dev
the backend = ## Running the Backend

### Prerequisites
- JDK 21 installed

### Setup

1. Clone the repo and navigate to the backend folder:
```powershell
   cd backend
```

2. Run the app using the Maven Wrapper (no local Maven install needed):

   **Windows (PowerShell):**
```powershell
   .\mvnw.cmd spring-boot:run
```
example = 

cd c:\Users\chani\OneDrive\Desktop\Sprinn\backend
$env:JAVA_HOME="C:\Program Files\Java\jdk-21"
& "C:\Users\chani\.m2\wrapper\dists\apache-maven-3.9.8\1a32db21782867e9f6488a1c24b1f3b1c767fd081c60dfe51fa1713dccb13f17\bin\mvn.cmd" spring-boot:run
 
> If you hit a `JAVA_HOME not found` error, set it for your current session:
> ```powershell
> $env:JAVA_HOME = "C:\path\to\your\jdk-21"
> ```
> Find your JDK path with `where java` or check `C:\Program Files\Java\`.

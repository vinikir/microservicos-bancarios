package main

import (
    "log"
    "os"

    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
    "github.com/vinikir/account-service/internal/db"
    "github.com/vinikir/account-service/internal/handler"
)

func main() {
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found")
    }

    port := os.Getenv("PORT")
    if port == "" {
        port = "3000"
    }

    databaseUrl := os.Getenv("DATABASE_URL")
    pool, err := db.NewPostgresPool(databaseUrl)
    if err != nil {
        log.Fatalf("Unable to connect to DB: %v", err)
    }
    defer pool.Close()

    r := gin.Default()
    h := handler.NewAccountHandler(pool)

    r.GET("/health", func(c *gin.Context) {
        c.JSON(200, gin.H{"status": "ok"})
    })

    r.POST("/accounts", h.CreateAccount)
    r.GET("/accounts", h.ListAccounts)

    log.Printf("Starting server on port %s", port)
    if err := r.Run(":" + port); err != nil {
        log.Fatalf("Failed to run server: %v", err)
    }
}

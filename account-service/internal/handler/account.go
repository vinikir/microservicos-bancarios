package handler

import (
    "context"
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/google/uuid"
    "github.com/jackc/pgx/v5/pgxpool"
    "github.com/vinikir/account-service/internal/model"
)

type AccountHandler struct {
    db *pgxpool.Pool
}

func NewAccountHandler(db *pgxpool.Pool) *AccountHandler {
    return &AccountHandler{db: db}
}

func (h *AccountHandler) CreateAccount(c *gin.Context) {
    var req struct {
        Owner string `json:"owner" binding:"required"`
    }
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    account := model.Account{
        ID:    uuid.New().String(),
        Owner: req.Owner,
        Balance: 0,
    }

    _, err := h.db.Exec(context.Background(),
        "INSERT INTO accounts (id, owner, balance) VALUES ($1, $2, $3)",
        account.ID, account.Owner, account.Balance)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create account"})
        return
    }

    c.JSON(http.StatusCreated, account)
}

func (h *AccountHandler) ListAccounts(c *gin.Context) {
    rows, err := h.db.Query(context.Background(), "SELECT id, owner, balance FROM accounts")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to list accounts"})
        return
    }
    defer rows.Close()

    var accounts []model.Account
    for rows.Next() {
        var a model.Account
        err := rows.Scan(&a.ID, &a.Owner, &a.Balance)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to scan account"})
            return
        }
        accounts = append(accounts, a)
    }

    c.JSON(http.StatusOK, accounts)
}

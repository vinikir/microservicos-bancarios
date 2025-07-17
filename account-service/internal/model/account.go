package model

type Account struct {
    ID      string `json:"id"`
    Owner   string `json:"owner"`
    Balance int64  `json:"balance"`
}

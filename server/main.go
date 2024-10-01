package main

import (
	"server/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// 初始化路由
	routes.InitRoutes(r)

	// 启动服务
	r.Run(":8080") // 服务监听端口 8080
}

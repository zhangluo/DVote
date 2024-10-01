package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.POST("/election", controllers.CreateElection)
		api.GET("/elections", controllers.GetElections)
		api.POST("/candidate", controllers.AddCandidate)
		api.POST("/vote", controllers.VoteCandidate)
		api.POST("/donate", controllers.DonateToCandidate)
		api.GET("/election/:id/candidates", controllers.GetCandidates)
		api.POST("/withdraw", controllers.WithdrawFunds)
	}
}

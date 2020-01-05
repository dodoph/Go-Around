package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"path/filepath"
	"reflect"
	"strconv"
	"cloud.google.com/go/storage"
	"github.com/gorilla/mux"
	"github.com/olivere/elastic"
	"github.com/pborman/uuid"
)

const (
	POST_INDEX = "post"
	DISTANCE   = "200km"

	ES_URL      = "http://10.128.0.2:9200"
	BUCKET_NAME = "quinmo-bucket"
)

var (
	mediaTypes = map[string]string{
		".jpeg": "image",
		".jpg":  "image",
		".gif":  "image",
		".png":  "image",
		".mov":  "video",
		".mp4":  "video",
		".avi":  "video",
		".flv":  "video",
		".wmv":  "video",
	}
)

type Post struct {
	User     string   `json:"user"`
	Message  string   `json:"message"`
	Url      string   `json:"url"`
	Type     string   `json:"type"`
	Face     float32  `json:"face"`
	Location Location `json:"location"`
}


type Location struct {
	Lat float64 `json:"lat"`
	Lon float64 `json:"lon"`
}

#! /bin/bash

ps -ef | grep nodejs | grep -v grep | awk '{print $2}' | xargs kill

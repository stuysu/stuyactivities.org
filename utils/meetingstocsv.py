import json
import csv
import requests
from datetime import datetime

url = "https://api.stuyactivities.org/graphql"

qs="""{
organizations
  {
  	name
    meetings {
      title,
      description,
      start,
      end,
      privacy,
      rooms {
        name
      }
    }
  }
}"""

response = requests.post(url=url, json={"query": qs})
if response.status_code != 200:
    print("ERROR: Query Received Status Code: ", response.status_code)

#data = json.load(open(input("Input file name: ")))

data = json.loads(response.content)
data = data["data"]["organizations"]

fn = input("Output file name: ")

printed = False

with open(fn, 'w', newline='', encoding="utf-8") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Name", "Meeting Count", "Meetings"])
    for org in data:
        org_name = org["name"]
        meeting_count = str(len(org["meetings"]))
        meetings_info = ""

        for meeting in org["meetings"]:
            title = "Title: " + meeting["title"]
            desc = "Desc: "
            if meeting["description"]:
                desc += meeting["description"]
            else:
                desc += "no desc"
            
            start = "From: " + meeting["start"]
            end = "To: " + meeting["end"]
            privacy = "Privacy: " + meeting["privacy"]
            rooms = ""

            if len(meeting["rooms"]):
                rooms = meeting["rooms"][0]["name"]
            else:
                rooms = "Likely Online"

            meeting_data = f"{title} {desc} {start} {end} {privacy} {rooms}"
            meetings_info += meeting_data + "\n"

        writer.writerow([org_name, meeting_count, meetings_info])

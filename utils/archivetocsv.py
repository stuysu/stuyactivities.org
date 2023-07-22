import json
import csv
import requests

url = "https://api.stuyactivities.org/graphql"

qs = """{
  organizations
  {
  	name
    url
  	active
    charter {
      picture {
        url
      }
      mission
      purpose
      benefit
      socials
      appointmentProcedures
      uniqueness
      meetingSchedule
      meetingDays
      commitmentLevel
      keywords
      extra
    }
    memberships {
      user {
        firstName
        lastName
      }
      role
      adminPrivileges
    }
  }
}"""

response = requests.post(url=url, json={"query": qs})
if response.status_code != 200:
    print("ERROR: Query Received Status Code: ", response.status_code)

#data = json.load(open(input("Input file name: ")))

data = json.loads(response.content)
data = data["data"]["organizations"]

#print(data)

fn = input("Output file name: ")

printed = False

with open(fn, 'w', newline='', encoding="utf-8") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Name", "URL", "Is Active", "Picture", "Mission", "Purpose", "Benefit", "Socials", "Appointment Procedures", "Uniqueness", "Meeting Schedule", "Meeting Days", "Commitment Level", "Keywords", "Extra", "Users with Admin", "Member Count"])
    for org in data:
        adminInfo = ""
        memberCount = len(org["memberships"])
        for member in org["memberships"]:
            if member["adminPrivileges"]:
              adminInfo += member["user"]["firstName"] + " " + member["user"]["lastName"] + " - " + member["role"] + "\n"
        pic = "NONE"
        if org["charter"]["picture"]:
            pic = org["charter"]["picture"]["url"]
        writer.writerow(
            [
                org["name"], 
                org["url"], 
                str(org["active"]), 
                pic, 
                org["charter"]["mission"], 
                org["charter"]["purpose"], 
                org["charter"]["benefit"], 
                org["charter"]["socials"], 
                org["charter"]["appointmentProcedures"], 
                org["charter"]["uniqueness"], 
                org["charter"]["meetingSchedule"], 
                org["charter"]["meetingDays"], 
                org["charter"]["commitmentLevel"], 
                org["charter"]["keywords"], 
                org["charter"]["extra"], 
                adminInfo,
                memberCount
             ]
        )
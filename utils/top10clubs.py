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
    }
  }
}"""

response = requests.post(url=url, json={"query": qs})
if response.status_code != 200:
    print("ERROR: Query Received Status Code: ", response.status_code)

#data = json.load(open(input("Input file name: ")))

data = json.loads(response.content)
data = data["data"]["organizations"]

# printed = False <- what is this for?

data = sorted(data, reverse=True, key=lambda x : len(x["memberships"]))
top10 = data[0:10]

for orgs in top10:
    print(orgs["name"] + " has " + str(len(orgs["memberships"])) + " members!")

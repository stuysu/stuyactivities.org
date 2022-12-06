import json
import csv
import requests

url = "https://api.stuyactivities.org/graphql"

response = requests.post(url=url, json={"query": "{organizations{\nname\nactive\n}}"})
if response.status_code != 200:
    print("ERROR: Query Received Status Code: ", response.status_code)

#data = json.load(open(input("Input file name: ")))

data = json.loads(response.content)
data = data["data"]["organizations"]

#print(data)

fn = input("Output file name: ")

with open(fn, 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Organization name", "Is organization active/approved"])
    for org in data:
        writer.writerow([org["name"], str(org["active"])])

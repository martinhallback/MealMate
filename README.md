# TDDD83 Project




## Getting started
The first time you want to use these files you need to follow two steps.
1. Clone the project  
Make sure you've got an SSH key  
Navigate to a suitable repository on your machine (make sure it's not inside another git repository).  
Use
```
git clone git@gitlab.liu.se:ponat404/tddd83project.git
```
to clone via SSH


2. Install venv:
Use 
```
cd server
``` 
and then install venv using this command:
```
python3 -m venv venv
```

## Start working on a task

### Checkout Main Development Branch: 
Start by ensuring you are on the main development branch of your repository. You can do this by running:  
```
git checkout main
```

### Create a Feature/Fix/Enhancement Branch:
Create a new feature branch for the task or feature you're working on. Replace feature/your-feature-name with an appropriate branch name:
```
git checkout -b feature/your-feature-name
```

### Implement Changes:
Make the necessary changes to your codebase to implement the feature or fix the issue you're working on.  

### Stage and Commit Changes:  
Stage the changes you've made. Replace file1, file2, etc., with the names of the files you've modified:
```
git add file1 file2 ...
```
Commit the changes with a descriptive commit message:  
```
git commit -m "Implement feature XYZ"
```

## Submit Pull Request and Merge Feature Branch

### Push Feature Branch to Remote:
Once you're satisfied with the changes in your feature branch, push it to the remote repository:  
```
git push origin feature/your-feature-name
```

### Create Pull Request:
Visit the repository on your Git hosting platform (e.g., GitLab) and navigate to the Pull Requests (or Merge Requests) section.  
- Create a new pull request from your feature branch to the main development branch.  
- Add a description so the pull can be reviewed faster.  
- Add the frontend/backend responsible as reviewer and submit. 

### Merge Pull Request:
Once the pull request has been approved, create a merge request and assign the development responsible as the reviewer.  
Make sure the delete source branch when merge is enabled.

#### If it's not removed:
After the merge is complete and the branch still exists:
```
git checkout main
git branch -d feature/your-feature-name  # Delete locally
git push origin --delete feature/your-feature-name  # Delete remotely
```  
Ensure that your local main branch is up to date by running the following:
```
git pull origin main
``` 
















## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.liu.se/ponat404/tddd83project/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***


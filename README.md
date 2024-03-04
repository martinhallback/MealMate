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

### Fetch(Pull) from main
Once you're done with the development, fetch the current state of main in order to resolve conflicts before merging. This is done by:
```
git fetch origin main
```
This will lead to you having to resolve any potential conflicts.


### Merge Branch:
Once the conflicts has been resolved, create a merge request and assign the development responsible as the reviewer.  (This is done in GitLab)
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


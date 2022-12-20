.PHONY: *

ifndef GITHUB_TOKEN
$(error GITHUB_TOKEN is not set. please use `GITHUB_TOKEN=<YOUR_ENV> make release` or `export GITHUB_TOKEN=<YOUR_ENV>. Generate personal access tokens if not.`)
endif
ifndef WINDOWS_PFX_FILE
$(error WINDOWS_PFX_FILE is not set. please use `WINDOWS_PFX_FILE=<YOUR_ENV> make release` or `export WINDOWS_PFX_FILE=<YOUR_ENV>.`)
endif
ifndef WINDOWS_PFX_PASSWORD
$(error WINDOWS_PFX_PASSWORD is not set. please use `WINDOWS_PFX_PASSWORD=<YOUR_ENV> make release` or `export WINDOWS_PFX_PASSWORD=<YOUR_ENV>.`)
endif

OWNER=underground
REPO=github-actions-example
WORK_FLOW_ID=windows.yml

#.SILENT:
release: .env
	echo "Type the release tag:"; \
	read tag; \
	\
	echo "Publish '$$tag' as a Github release? [ENTER to continue]"; \
	read pass; \
	\
	curl \
		-X POST \
		--header 'Accept: application/vnd.github+json' \
		--header 'X-GitHub-Api-Version: 2022-11-28' \
		--header 'Authorization: Bearer ${GITHUB_TOKEN}' \
		--data "{\"ref\":\"$$tag\", \"inputs\": { \"windows_pfx_file\":\"${WINDOWS_PFX_FILE}\", \"windows_pfx_password\": \"${WINDOWS_PFX_PASSWORD}\" } }\"" \
		"https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORK_FLOW_ID}/dispatches";	\

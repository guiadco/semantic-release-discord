.PHONY += dependencies
dependencies:
	npm ci

.PHONY += local_publish
local_publish: dependencies
	npx semantic-release --no-ci

.PHONY += dry_run
dry_run:
	npx semantic-release --dry-run

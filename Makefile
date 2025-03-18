.PHONY: all build up down logs clean migrations migrate createsuperuser shell test

# Start everything (background mode)
all: build up-detached

# Start everything with logs (foreground mode)
all-fg: build up

# Build images
build:
	docker-compose build

# Start services with logs (foreground mode)
up:
	docker-compose up

# Start services in background
up-detached:
	docker-compose up -d

# Stop services
down:
	docker-compose down

# View logs
logs:
	docker-compose logs -f

# Clean volumes
clean:
	docker-compose down -v

# Make migrations
migrations:
	docker-compose run --rm backend python manage.py makemigrations

# Apply migrations
migrate:
	docker-compose run --rm backend python manage.py migrate

# Create superuser
createsuperuser:
	docker-compose run --rm backend python manage.py createsuperuser

# Django shell
shell:
	docker-compose run --rm backend python manage.py shell

# Run tests
test:
	docker-compose run --rm backend python manage.py test
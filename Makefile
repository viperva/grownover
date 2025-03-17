.PHONY: all build up down logs clean migrations migrate createsuperuser shell test

# Start everything
all: build up

# Build images
build:
	docker-compose build

# Start services
up:
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

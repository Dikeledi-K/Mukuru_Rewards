#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

def main():
    """Run administrative tasks."""
    # Set the default settings module for the Django project
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rewards_api.settings')
    
    try:
        # Import the function that handles command-line commands
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # Raise error if Django isn't installed
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    # Execute the command you pass via the terminal
    execute_from_command_line(sys.argv)

# Ensures main() runs only if this file is executed directly
if __name__ == '__main__':
    main()

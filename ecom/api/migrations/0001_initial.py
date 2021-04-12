from django.db import migrations
from api.user.models import CustomUser

class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(name="Sharmistha",
                          email="sharmistha.m99@gmail.com",
                          phone="8910899728",
                          gender="Female",
                          is_staff=True,
                          is_active=True,
                          is_superuser=True)

        user.set_password("12345")
        user.save()

    dependecies=[

    ]

    operations=[
        migrations.RunPython(seed_data),
    ]
# Generated by Django 5.0.6 on 2024-06-20 14:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0010_alter_image_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='unit',
            old_name='units',
            new_name='unit_building',
        ),
        migrations.AddField(
            model_name='unit',
            name='images',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='app1.image', verbose_name='images'),
        ),
        migrations.AddField(
            model_name='unit',
            name='occupied',
            field=models.BooleanField(default=False),
        ),
    ]

# Generated by Django 5.0.6 on 2024-06-20 14:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0007_rename_images_image_rename_units_unit'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='building',
            name='units',
        ),
        migrations.AddField(
            model_name='building',
            name='location',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='unit',
            name='units',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app1.building', verbose_name='units'),
        ),
    ]

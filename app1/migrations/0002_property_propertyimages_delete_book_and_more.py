# Generated by Django 5.0.6 on 2024-07-03 15:37

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100)),
                ('location', models.CharField(max_length=500, null=True)),
                ('booked_count', models.IntegerField(blank=True, default=0)),
                ('subscribers_count', models.IntegerField(blank=True, default=0)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='building', to='app1.category')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PropertyImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, default=None, max_length=1000, null=True)),
                ('file', models.FileField(upload_to='')),
                ('property', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='app1.property')),
            ],
        ),
        migrations.DeleteModel(
            name='Book',
        ),
        migrations.RemoveField(
            model_name='building',
            name='category',
        ),
        migrations.RemoveField(
            model_name='unit',
            name='unit_building',
        ),
        migrations.AddField(
            model_name='unit',
            name='unit_property',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app1.property'),
        ),
        migrations.DeleteModel(
            name='BuildingImages',
        ),
        migrations.DeleteModel(
            name='Building',
        ),
    ]

# Generated by Django 4.2.1 on 2023-06-06 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('divio_task', '0007_user_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='name',
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]

# Generated by Django 4.2.1 on 2023-06-06 09:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('divio_task', '0009_remove_product_user_productselection'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productselection',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
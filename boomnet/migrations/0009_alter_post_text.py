# Generated by Django 4.2.3 on 2023-08-05 07:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boomnet', '0008_alter_comment_text_alter_profile_date_of_birth'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='text',
            field=models.TextField(blank=True),
        ),
    ]

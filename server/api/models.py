from django.db import models

class Office(models.Model):
    """Model to store office information"""
    office_name = models.CharField(max_length=100, unique=True)
    office_full_name = models.CharField(max_length=255)
    location = models.TextField()
    slogan = models.CharField(max_length=255, blank=True, null=True)
    established = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Office'
        verbose_name_plural = 'Offices'

    def __str__(self):
        return self.office_name


class CommitteeType(models.Model):
    """Model to store committee type information"""
    name = models.CharField(max_length=100, unique=True)
    name_eng = models.CharField(max_length=100, unique=True)
    committee_type_code = models.CharField(max_length=50, unique=True, default='CT001')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Committee Type'
        verbose_name_plural = 'Committee Types'

    def __str__(self):
        return f"{self.name} ({self.name_eng})"

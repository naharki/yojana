from django.db import models

class FiscalYear(models.Model):
    fiscalyear = models.CharField(max_length=9, unique=True)  # e.g., "2023/2024"
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.fiscalyear
    
    class Meta:
        ordering = ['-start_date']
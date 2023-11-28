from django import forms
from django.contrib.auth.models import User


class UserSignUpForm(forms.ModelForm):
    password = forms.CharField(label="Password", widget=forms.PasswordInput)
    password1 = forms.CharField(label="Repeat password", widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email"]

    def clean(self):
        if 'password' in self.cleaned_data and 'password1' in self.cleaned_data and \
                self.cleaned_data['password'] != self.cleaned_data['password1']:
            raise forms.ValidationError("The password does not match ")
        return self.cleaned_data

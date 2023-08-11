from django.contrib.auth.models import User
from django.http import HttpRequest
from django.template.loader import render_to_string
from django.urls import resolve
from django.test import TestCase
from .views import index


class HomePageTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass'
        )

    def test_root_url_resolves_to_index_view(self):
        found = resolve('/')
        self.assertEquals(found.func, index)

    def test_home_page_returns_correct_html(self):
        request = HttpRequest()
        request.user = self.user
        response = index(request)
        html = response.content.decode('utf8')
        expected_html = render_to_string('boomnet/index.html')
        self.assertContains(html, expected_html)


if __name__ == '__main__':
    HomePageTest()

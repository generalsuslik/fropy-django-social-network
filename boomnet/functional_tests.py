from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import unittest


class NewVisitorTest(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.quit()

    def test_can_start_a_list_and_retrieve_it_later(self):
        self.browser.get('http://localhost:8000')

        inputbox = self.browser.find_element()
        self.assertEqual(
            inputbox.get_attribute('placeholder'),
            'Search users and topics'
        )

        inputbox.send_keys('admin')

        inputbox.send_keys(Keys.ENTER)
        time.sleep(1)


if __name__ == '__main__':
    unittest.main()

class GeoLocationMixin: #������� ������������ ����� �����, ���������� ������ �/��� ��������, ������� ����� ���� ��������� � ������ ������� ��� ���������� �� ����� ����������������, ��� �������� ������������
    """
    A mixin class providing methods for obtaining location information.

    Methods:
    - get_location_info(): Returns information about the location of the object.
    """

    def get_location_info(self):
        """
        Returns information about the location of the object.

        Returns:
        - str: Information about the location of the object.
        """
        return f"City {self.name} is in {self.country}"
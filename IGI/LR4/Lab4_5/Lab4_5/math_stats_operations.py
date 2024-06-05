import numpy as np

class MathStatsOperations:
    #������� ��������������
    def calculate_mean(self, arr):
        """Calculate the mean of an array."""
        return np.mean(arr)

    #����� ������������������(���� ����� ������ �����-����������� ��� �����������)
    def calculate_median(self, arr):
        """Calculate the median of an array."""
        return np.median(arr)

    def calculate_corrcoef(self, arr1, arr2):
        """Calculate the correlation coefficient between two arrays."""
        return np.corrcoef(arr1.flatten(), arr2.flatten())[0, 1] # ��� ����� ��������� ��������� � �������� ����� ��������� � ���������� ������, ����� �������� ���������� �����
    #���������
    def calculate_variance(self, arr):
        """Calculate the variance of an array."""
        return np.var(arr)
    #����������
    def calculate_std_deviation(self, arr):
        """Calculate the standard deviation of an array."""
        return np.std(arr)


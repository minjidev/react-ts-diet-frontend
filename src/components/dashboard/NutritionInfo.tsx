import React from 'react';
import { SavedRecipesByDate } from '../../types/types';
import { styled } from 'styled-components';
import { Chart } from 'react-chartjs-2';
import { Context } from 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title as ChartTitle,
} from 'chart.js';

interface NutritionInfoProps {
  savedRecipes: SavedRecipesByDate;
}

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ChartTitle,
  LineController,
  BarController,
  ChartDataLabels
);

const NutritionInfo = ({ savedRecipes }: NutritionInfoProps) => {
  const data = {
    labels: ['Energy', 'Carbs', 'Protein', 'Fat'],
    datasets: [
      {
        type: 'line' as const,
        data: savedRecipes.totalDailyByDate.map(n => Number(n?.quantity)),
        borderColor: 'lightgray',
        datalabels: {
          anchor: 'end' as const,
          align: 'right' as const,
          formatter: function (value: number) {
            return `${value} %`;
          },
          font: {
            weight: 'bold' as const,
            size: 16,
          },
        },
      },
      {
        type: 'bar' as const,
        data: savedRecipes.totalDailyByDate.map(n => Number(n?.quantity)),
        backgroundColor: ['#DCD0E6', '#DEE0EF', '#D9E5ED', '#d9ede0'],
        borderRadius: 1.2,
        datalabels: {
          anchor: 'start' as const,
          align: 'end' as const,
          formatter: function (value: number, context: Context) {
            return (
              savedRecipes.totalNutrientsByDate[context.dataIndex]?.quantity! +
              savedRecipes.totalNutrientsByDate[context.dataIndex]?.unit!
            );
          },
          font: {
            weight: 'bold' as const,
            size: 16,
          },
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
        outerWidth: 1,
      },
    },
    interaction: {
      mode: 'index' as const,
    },
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false,
      },
    },
    parsing: {
      key: 'percent',
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        max: 100,
      },
      y: {},
    },
    layout: {
      padding: {
        left: 20,
        right: 60,
      },
    },
  };

  return (
    <Container aria-labelledby="main nutrition intake">
      <Title id="main nutrition intake">Main Nutrition Intake</Title>
      <Chart type="bar" data={data} options={options} />
    </Container>
  );
};

const Title = styled.h2`
  font-weight: 400;
  font-size: 1.4rem;
  padding: 1rem;
`;

const Container = styled.section`
  width: 50rem;
  height: 20rem;
  margin: 1rem 0 6rem 0;
`;

export default NutritionInfo;

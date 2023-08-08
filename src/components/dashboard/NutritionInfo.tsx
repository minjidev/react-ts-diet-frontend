import React from 'react';
import { SavedRecipesByDate } from '../../types/types';
import { styled } from 'styled-components';
import { Chart } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
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
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface NutritionInfoProps {
  savedRecipes: SavedRecipesByDate;
}

interface ChartProps {
  options: ChartOptions<'bar'>;
  data: ChartData<'bar'>;
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
          formatter: function (value, context) {
            return value + '%';
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
          formatter: function (value, context) {
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
    // responsive: true,
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
      },
      y: {},
    },
  };

  return (
    <Container>
      <Title>Main Nutrition Intake</Title>
      <Chart type="bar" data={data} options={options} />
    </Container>
  );
};

const Title = styled.div`
  font-weight: 400;
  font-size: 1.6rem;
  margin: 1rem;
`;

const Container = styled.div`
  width: 50rem;
  height: 20rem;
  margin: 1rem 0 6rem 0;
`;

export default NutritionInfo;

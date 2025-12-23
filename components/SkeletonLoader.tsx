
import React from 'react';

export const PropertySkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full animate-pulse">
    <div className="aspect-[4/3] bg-gray-200"></div>
    <div className="p-5 flex-grow space-y-3">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-100">
        <div className="h-8 bg-gray-100 rounded"></div>
        <div className="h-8 bg-gray-100 rounded"></div>
        <div className="h-8 bg-gray-100 rounded"></div>
      </div>
    </div>
    <div className="p-5 bg-gray-50 border-t border-gray-100 flex justify-between">
      <div className="h-8 bg-gray-200 rounded-full w-24"></div>
      <div className="h-8 bg-gray-200 rounded w-16"></div>
    </div>
  </div>
);

export const DetailSkeleton = () => (
  <div className="animate-pulse space-y-8">
    <div className="h-12 bg-gray-200 rounded w-1/2"></div>
    <div className="aspect-video bg-gray-200 rounded-3xl"></div>
    <div className="grid grid-cols-4 gap-6">
      <div className="h-20 bg-gray-200 rounded-2xl"></div>
      <div className="h-20 bg-gray-200 rounded-2xl"></div>
      <div className="h-20 bg-gray-200 rounded-2xl"></div>
      <div className="h-20 bg-gray-200 rounded-2xl"></div>
    </div>
  </div>
);

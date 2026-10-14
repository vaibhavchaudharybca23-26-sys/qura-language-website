import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  Layers,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
  ChevronRight,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { roadmapData, RoadmapMilestone } from '../data/roadmapData';

export const RoadmapPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const statuses = ['All', 'Implemented', 'In Progress', 'Planned', 'Under Consideration'];

  const filteredMilestones =
    filterStatus === 'All'
      ? roadmapData
      : roadmapData.filter((m) => m.status === filterStatus);

  const getStatusBadge = (status: RoadmapMilestone['status']) => {
    switch (status) {
      case 'Implemented':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Implemented</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Clock className="w-3.5 h-3.5" />
            <span>In Progress</span>
          </span>
        );
      case 'Planned':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Calendar className="w-3.5 h-3.5" />
            <span>Planned</span>
          </span>
        );
      case 'Under Consideration':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Under Consideration</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Layers className="w-3.5 h-3.5" />
          <span>Project Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Qura Language Roadmap
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Transparent progression of completed and upcoming milestones. We explicitly separate verified capabilities from
          future architectural goals.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filterStatus === status
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Milestones Timeline */}
      <div className="space-y-6">
        {filteredMilestones.map((milestone) => (
          <div
            key={milestone.number}
            className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Milestone {milestone.number}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{milestone.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                {milestone.targetRelease && (
                  <span className="text-xs font-mono text-slate-400">Target: {milestone.targetRelease}</span>
                )}
                {getStatusBadge(milestone.status)}
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {milestone.summary}
            </p>

            {/* Deliverables checklist */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono block mb-3">
                Deliverables & Scope:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {milestone.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 shrink-0 mt-0.5" />
                    )}
                    <span className={item.done ? 'font-medium' : 'text-slate-500 dark:text-slate-400'}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
